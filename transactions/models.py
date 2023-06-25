import uuid

from django.db import models

from users.models import User


class Transaction(models.Model):
    RECEIPT = 'rec'
    WRITE_DOWNS = 'wri'
    REASON_CHOICES = [(RECEIPT, 'receipt'), (WRITE_DOWNS, 'write-downs')]

    guid = models.CharField(primary_key=True, max_length=64, editable=False,
                            default=uuid.uuid4, db_column='guid',
                            verbose_name='key')
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             verbose_name='User')
    amount = models.FloatField(default=0.00, verbose_name='amount')
    reason = models.CharField(max_length=10, choices=REASON_CHOICES,
                              default=RECEIPT)
    on_delete = models.BooleanField(verbose_name='Deleted', db_index=True,
                                    default=False)
    date_created = models.DateTimeField(verbose_name='Date of creation',
                                        auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Date of update',
                                        auto_now=True)


