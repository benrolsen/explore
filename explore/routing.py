from channels.routing import route, route_class
from buttons import consumers


channel_routing = [
    route_class(consumers.AppConsumer, path=r"^/buttons/"),
]

