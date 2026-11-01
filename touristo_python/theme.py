"""
TOURISTO - Central Theme Constants & Styling
Matches the reference image color palette.
"""
THEME_COLORS = {
    # Core Brand Palette
    'primary': '#087F68',          # Deep teal green
    'primary_dark': '#075B4E',     # Dark teal
    'primary_action': '#07866D',   # Primary buttons & active nav
    'light_mint': '#E6F6EF',       # Light mint background
    'background': '#FFFFFF',       # Main white background
    'background_light': '#F5F7F7', # Soft grey background
    'border': '#E2E8E6',           # Dividers & card borders
    'text_primary': '#172B2A',     # Primary text
    'text_secondary': '#62716F',   # Secondary text
    'success': '#15965F',          # Safe indicators
    'warning': '#F4B740',          # Caution
    'error': '#E53935',            # High-risk

    # 6 Pastel Card Colors
    'card_scam_detector': '#FEF8D8',     # Pale yellow
    'card_currency_scanner': '#E3F2FD',  # Pale blue
    'card_translator': '#FCE4EC',        # Pale pink
    'card_currency_calc': '#E8F5E9',     # Pale mint green
    'card_women_safety': '#EDE7F6',      # Pale lavender
    'card_explore_india': '#FFF3E0',     # Pale peach

    # SOS Dark Red Theme
    'sos_bg': '#450A0A',
    'sos_surface': '#7F1D1D',
    'sos_bright': '#DC2626',
    'sos_border': '#991B1B',
}

def init_kivy_theme(app):
    """Initializes KivyMD theme properties"""
    app.theme_cls.primary_palette = "Teal"
    app.theme_cls.theme_style = "Light"
    app.theme_cls.material_style = "M3"
