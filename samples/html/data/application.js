Tr8n.cache(function(data) {
  data.application = {
    "key":"default",
    "name":"Sample",
    "default_locale":"en-US",
    "languages":[
      {
        "locale":"en-US",
        "name":"English (US)",
        "english_name":"English (U.S.)",
        "native_name":"English (US)",
        "flag_url":"http://lvh.me:3000/media/57/23/20/19/cf185dab9566b718e.png"
      },
      {
        "locale":"ru",
        "name":"Русский",
        "english_name":"Russian",
        "native_name":"Русский",
        "right_to_left":false,
        "flag_url":"http://lvh.me:3000/media/54/39/11/49/cb768f030bde97f97.png"
      }
    ],
    "featured_locales":[
      "ru"
    ],
    "threshold":1,
    "translator_level":1,
    "features":{
      "inline_translations":true,
      "machine_translations":true,
      "translation_suggestions":true,
      "decorations":true,
      "shortcuts":true,
      "context_rules":true,
      "language_cases":true,
      "javascript_sdk":false,
      "glossary":true,
      "forum":true,
      "awards":true,
      "admin_translations":true,
      "open_registration":true,
      "language_flags":true
    },
    "tokens":{
      "data":{
        "nbsp":"&nbsp;"
      },
      "decoration":{
        "link":"<a href=\"{$href}\">{$0}</a>",
        "strong":"<strong>{$0}</strong>"
      }
    },
    "css":".tr8n_not_translated { border-bottom: 2px dotted red; } .tr8n_translated { border-bottom: 2px dotted green; } .tr8n_fallback { border-bottom: 2px dotted #e90; } .tr8n_locked { border-bottom: 2px dotted blue; } .tr8n_pending { border-bottom: 2px dotted #e90; } .tr8n_language_case { padding:3px; border: 1px dotted blue; }",
    "shortcuts":{
      "Ctrl+Shift+S":"Tr8n.UI.Lightbox.show('/tr8n/help/lb_shortcuts', {width:400});",
      "Ctrl+Shift+I":"Tr8n.UI.LanguageSelector.toggleInlineTranslations();",
      "Ctrl+Shift+L":"Tr8n.UI.LanguageSelector.show(true);",
      "Ctrl+Shift+N":"Tr8n.UI.Lightbox.show('/tr8n/translator/notifications/lb_notifications', {width:600});",
      "Ctrl+Shift+K":"Tr8n.Utils.toggleKeyboards();",
      "Ctrl+Shift+C":"Tr8n.UI.Lightbox.show('/tr8n/help/lb_source?source=' + Tr8n.source, {width:420});",
      "Ctrl+Shift+T":"Tr8n.UI.Lightbox.show('/tr8n/help/lb_stats', {width:420});",
      "Ctrl+Shift+D":"Tr8n.SDK.Proxy.debug();",
      "Ctrl+Shift+R":"Tr8n.Utils.reloadSettings();",
      "Ctrl+Shift+W":"Tr8n.UI.Widget.toggle();",
      "Alt+Shift+C":"Tr8n.Utils.redirectTo('/tr8n/help/credits')",
      "Alt+Shift+D":"Tr8n.Utils.redirectTo('/tr8n/translator/dashboard')",
      "Alt+Shift+M":"Tr8n.Utils.redirectTo('/tr8n/app/sitemap')",
      "Alt+Shift+P":"Tr8n.Utils.redirectTo('/tr8n/app/phrases')",
      "Alt+Shift+T":"Tr8n.Utils.redirectTo('/tr8n/app/translations')",
      "Alt+Shift+A":"Tr8n.Utils.redirectTo('/tr8n/app/awards')",
      "Alt+Shift+B":"Tr8n.Utils.redirectTo('/tr8n/app/forum')",
      "Alt+Shift+G":"Tr8n.Utils.redirectTo('/tr8n/app/glossary')"
    }
  };
});

