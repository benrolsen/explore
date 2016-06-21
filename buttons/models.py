import json
from django.db import models
from channels import Group


class Prize(models.Model):
    name = models.CharField("Name", max_length=80)
    value = models.FloatField("Value")

    def __str__(self):
        return self.name


class TugRope(models.Model):
    name = models.CharField("Name", max_length=80)
    created_on = models.DateTimeField(auto_now_add=True)
    position = models.IntegerField("Position", default=50)
    prize = models.ForeignKey("Prize", null=True, blank=True)

    def left(self):
        self.position -= 1
        if self.position < 0:
            self.position = 0
        self.save()

    def right(self):
        self.position += 1
        if self.position > 100:
            self.position = 100
        self.save()

    def serialize(self):
        return {'id': self.id, 'name': self.name, 'position': self.position}

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Group(self.__class__.__name__).send({
            'text': json.dumps(self.serialize())
        })

    def __str__(self):
        return self.name


