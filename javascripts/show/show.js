class ContactInfoWidget {
  constructor(config) {
    this.configs = config;
    this.widgetId = config.widgetId;
    this.widget = $(`#${this.widgetId}`);
    this.phoneOptions = config;
    this.phoneNumber = new PhoneNumber(this.phoneOptions, `#${this.widgetId}`);
    this.initChat();
    this.initSocialLinks();
    this.moveWidgetInDom(this.configs);
    this.moveSocialLinks(this.configs);
    this.movePhoneNumber(this.configs);
  }

  moveWidgetInDom(configs){
    if (configs.insertAfter == 'true') {
      this.widget.insertAfter(`${configs.targetElement}`);
    }
    if (configs.insertBefore == 'true') {
      this.widget.insertBefore(`${configs.targetElement}`);
    }
  }

  moveSocialLinks(configs){
    let scopedSocial = $(`.${this.widgetId}.full-width-banner`);
    if (configs.moveSocial == 'true') {
      scopedSocial.prepend($(`.${this.widgetId} .social-links`));
    }
  }

  movePhoneNumber(configs){
    let scopedPhone = $(`.${this.widgetId}.full-width-banner`);
    if (configs.movePhone == 'true') {
      scopedPhone.append($(`.${this.widgetId} .phone`));
    }
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
