"""
TOURISTO — Travel Smart. Travel Safe.
Main Application Entry Point (Python 3.11+ / KivyMD).
"""
import sys
import os

from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.core.window import Window
from kivy.lang import Builder

from theme import init_kivy_theme, THEME_COLORS
from database.db import init_db

# Basic KV Layout String for Demonstration on Desktop
KV = '''
ScreenManager:
    SplashScreen:
    HomeScreen:

<SplashScreen@Screen>:
    name: 'splash'
    MDFloatLayout:
        md_bg_color: 0.9, 0.96, 0.94, 1
        MDLabel:
            text: "TOURISTO"
            halign: "center"
            font_style: "H3"
            theme_text_color: "Custom"
            text_color: 0.03, 0.5, 0.41, 1
            pos_hint: {"center_x": .5, "center_y": .6}
        MDLabel:
            text: "Travel Smart. Travel Safe."
            halign: "center"
            font_style: "Subtitle1"
            theme_text_color: "Custom"
            text_color: 0.03, 0.36, 0.31, 1
            pos_hint: {"center_x": .5, "center_y": .52}
        MDRaisedButton:
            text: "Let's Explore Safely..."
            pos_hint: {"center_x": .5, "center_y": .3}
            md_bg_color: 0.03, 0.5, 0.41, 1
            on_release: root.manager.current = 'home'

<HomeScreen@Screen>:
    name: 'home'
    MDFloatLayout:
        md_bg_color: 0.96, 0.97, 0.97, 1
        MDTopAppBar:
            title: "TOURISTO — India"
            pos_hint: {"top": 1}
            elevation: 2
            md_bg_color: 0.03, 0.5, 0.41, 1
        MDLabel:
            text: "Select a Travel Module"
            halign: "center"
            pos_hint: {"center_x": .5, "center_y": .8}
            font_style: "H5"
'''

class TouristoApp(MDApp):
    def build(self):
        # Configure mobile resolution for desktop development
        Window.size = (390, 800)
        init_kivy_theme(self)
        init_db()
        return Builder.load_string(KV)

if __name__ == '__main__':
    TouristoApp().run()
