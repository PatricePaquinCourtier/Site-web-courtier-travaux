{
    'name': 'Courtier Travaux Website',
    'version': '1.0',
    'depends': ['website'],
    'data': ['views/website_page.xml'],
    'assets': {
        'web.assets_frontend': [
            'courtier_travaux_odoo_ready/static/src/css/style.css',
            'courtier_travaux_odoo_ready/static/src/js/main.js',
        ],
    },
    'installable': True,
}