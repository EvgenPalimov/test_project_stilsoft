from django.core.management.base import BaseCommand
from faker import Faker

from balance.models import Balance
from users.models import User

FAKE = Faker()


class Command(BaseCommand):
    help = 'Create Superuser and some test users'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        # Delete all users
        User.objects.all().delete()

        # Create superuser
        User.objects.create_superuser(
            username='admin', first_name='Uegene', last_name='Pavlovich',
            email='uegene@mail.ru', password='admin',
            balance_id=Balance.objects.create().guid)
        user_count = options['count']

        # Create user data
        first_name = [FAKE.unique.first_name() for _ in range(user_count)]
        last_name = [FAKE.unique.last_name() for _ in range(user_count)]
        emails = [FAKE.unique.last_name() for _ in range(user_count)]
        passwords = [FAKE.unique.first_name() for _ in range(user_count)]

        # Create test users

        for f_name, l_name, email, password in zip(first_name, last_name,
                                                   emails, passwords):
            username = f'{f_name.lower()}_{l_name.lower()}'
            email = f'{l_name.lower()}@mail.ru'
            user_balance = Balance.objects.create()
            User.objects.create_user(
                username=username, email=email,
                first_name=f_name, last_name=l_name, password=password,
                balance_id=user_balance.guid
            )

        print('Superuser and test user - create.')
