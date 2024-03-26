from django.db import models

from PC_shop_backend.common.models import Product


class Computer(Product):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  # Call the superclass constructor
        self.type = 'computer'

    processor = models.CharField(max_length=50)
    graphics = models.CharField(max_length=50)
    memory = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)

    # Additional specifications
    cooler = models.CharField(max_length=200, blank=True)
    video_card = models.CharField(max_length=200, blank=True)
    motherboard = models.CharField(max_length=200, blank=True)
    power_supply = models.CharField(max_length=200, blank=True)
    operating_system = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.name} - {self.processor} - {self.memory} - {self.storage}"


class Monitor(Product):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  # Call the superclass constructor
        self.type = 'monitor'


    resolution = models.CharField(max_length=20)
    refresh_rate = models.CharField(max_length=10)
    panel_type = models.CharField(max_length=20)
    size = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.name} - {self.size} - {self.refresh_rate}"


class Keyboard(Product):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  # Call the superclass constructor
        self.type = 'keyboard'

    key_switch_type = models.CharField(
        max_length=30,
        choices=[
            ('membrane', 'Membrane'),
            ('mechanical', 'Mechanical'),
            ('scissor', 'Scissor'),
            # Add more types as needed
        ]
    )
    backlight = models.BooleanField(default=False)
    color = models.CharField(max_length=20, blank=True, null=True)  # Overall keyboard color
    wireless = models.BooleanField(default=False)

    def __str__(self):
        backlight_info = 'Backlight' if self.backlight else 'Not Backlit'
        color_info = f" - Color: {self.color}" if self.color else ""
        return f"{self.name} - {self.get_key_switch_type_display()} - {backlight_info}{color_info} - {'Wireless' if self.wireless else 'Wired'}"
