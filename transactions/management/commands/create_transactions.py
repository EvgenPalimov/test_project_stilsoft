import random
from django.core.management.base import BaseCommand

from transactions.models import Transaction
from users.models import User


class Command(BaseCommand):
    help = 'Create test data for transactions.'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):

        Transaction.objects.all().delete()

        user_count = options['count']
        users = [_ for _ in User.objects.all()]
        reasons = [Transaction.RECEIPT, Transaction.WRITE_DOWNS]
        amounts = [float(random.randint(0, 100000)) for _ in range(user_count)]

        for amount in amounts:
            user = random.choice(users)
            reason = random.choice(reasons)

            Transaction.objects.create(
                user=user, reason=reason,
                amount=amount
            )
            balance = user.balance
            if reason == Transaction.RECEIPT:
                balance.score += amount
                balance.save()
            else:
                balance.score -= amount
                balance.save()

        print('Transactions - create.')
