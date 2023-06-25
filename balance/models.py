import uuid

from django.db import models


class Balance(models.Model):
    guid = models.CharField(primary_key=True, max_length=64, editable=False,
                            default=uuid.uuid4, db_column='guid',
                            verbose_name='key')
    score = models.FloatField(default=0, verbose_name='scope')
    date_created = models.DateTimeField(verbose_name='Date of creation',
                                        auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Date of update',
                                        auto_now=True)
