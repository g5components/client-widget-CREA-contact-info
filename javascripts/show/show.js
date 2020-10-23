class ContactInfoWidget {
  constructor(config) {
    this.widgetId = config.widgetId;
    this.widget = $(`#${this.widgetId}`);
    this.phoneOptions = config;
    this.phoneNumber = new PhoneNumber(this.phoneOptions, `#${this.widgetId}`);
    this.initChat();
    this.initSocialLinks();
  }

  initChat(){
    return this.widget.find('.contact-info-chat').click(e=> {
      window.open(this.phoneOptions.chatUrl, 'Chat', "width=600, height=480, scrollbars=yes, resizable=yes");
      return e.preventDefault();
    });
  }

  initSocialLinks(){
    if ($(".social-links.widget").length < 1) {
      let localPath = window.location.href;

      if (window.location.hash) {
        localPath = localPath.replace(window.location.hash, '');
      }

      return (() => {
        const result = [];
        for (let element of Array.from($(".social-links use"))) {
          if ($(element).attr("xlink:href").indexOf("http") !== 0) {
            result.push($(element).attr("xlink:href", localPath + $(element).attr("xlink:href")));
          } else {
            result.push(undefined);
          }
        }
        return result;
      })();
    }
  }
}

G5.loadWidgetConfigs('.contact-info .config', ContactInfoWidget);
