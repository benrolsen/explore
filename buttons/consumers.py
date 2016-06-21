from django.apps import apps
from channels import Group
from channels.generic.websockets import JsonWebsocketConsumer

app = apps.get_app_config('buttons')

class AppConsumer(JsonWebsocketConsumer):
    strict_ordering = False
    slight_ordering = True

    def connect(self, message, **kwargs):
        # print("client connected: ", message.reply_channel)
        # send available models to subscribe to?
        return "Connected"


    def receive(self, content, **kwargs):
        if "model" in content and "command" in content:
            model_name = content.get("model")
            command = content.get("command")
            if command == "subscribe":
                Group(model_name, channel_layer=self.message.channel_layer).add(self.message.reply_channel)
            if command == "detail":
                model = app.get_model(model_name=model_name)
                id = content.get("id")
                obj, created = model.objects.get_or_create(id=id, defaults={'name': 'Bar #{}'.format(id)})
                self.send(obj.serialize())
            if command == "left":
                model = app.get_model(model_name=model_name)
                id = content.get("id")
                obj = model.objects.get(id=id)
                obj.left()
            if command == "right":
                model = app.get_model(model_name=model_name)
                id = content.get("id")
                obj = model.objects.get(id=id)
                obj.right()



    def disconnect(self, message, **kwargs):
        # print("client disconnected")
        pass





