if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'output'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'output'.");
}
var output = function (_, Kotlin) {
  'use strict';
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var clear = Kotlin.kotlin.dom.clear_asww5s$;
  var appendText = Kotlin.kotlin.dom.appendText_46n0ku$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var EventListener = Kotlin.org.w3c.dom.events.EventListener_gbr1zf$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  function processCreateForm(div, form) {
    var tmp$, tmp$_0, tmp$_1;
    var url = new URL('https://tutti.page.link/');
    var redirect = new URL(extractDestinationUrl(form));
    if (startsWith(redirect.toString(), 'https://www.tutti.ch/')) {
      tmp$ = 'ch.tutti';
    }
     else
      tmp$ = 'ch.tutti.debug';
    var apn = tmp$;
    url.searchParams.append('apn', apn);
    var tmp$_2;
    tmp$_2 = utmParams.iterator();
    while (tmp$_2.hasNext()) {
      var element = tmp$_2.next();
      var tmp$_3 = param(form, element);
      var name = tmp$_3.component1()
      , value = tmp$_3.component2();
      if (value.length > 0) {
        redirect.searchParams.append(name, value);
      }
    }
    var link = redirect.toString();
    url.searchParams.append('link', link);
    var message = Kotlin.isType(tmp$_0 = form.children['message'], HTMLAnchorElement) ? tmp$_0 : throwCCE();
    clear(message);
    appendText(message, url.toString());
    message.href = url.toString();
    var hiddenInput = Kotlin.isType(tmp$_1 = document.createElement('input'), HTMLInputElement) ? tmp$_1 : throwCCE();
    hiddenInput.id = 'hiddenInput';
    hiddenInput.value = url.toString();
    form.appendChild(hiddenInput);
    hiddenInput.select();
    document.execCommand('copy');
    form.removeChild(hiddenInput);
  }
  function extractDestinationUrl(form) {
    var tmp$, tmp$_0, tmp$_1;
    var container = Kotlin.isType(tmp$ = form.children['destination'], HTMLDivElement) ? tmp$ : throwCCE();
    var host = Kotlin.isType(tmp$_0 = document.getElementById('hostValue'), HTMLSpanElement) ? tmp$_0 : throwCCE();
    var redirect = Kotlin.isType(tmp$_1 = container.children['redirect'], HTMLInputElement) ? tmp$_1 : throwCCE();
    var urlPath = host.textContent + redirect.value;
    println(urlPath);
    return urlPath;
  }
  function createLink$lambda(closure$div) {
    return function (it) {
      var tmp$, tmp$_0;
      it.preventDefault();
      tmp$_0 = Kotlin.isType(tmp$ = it.target, HTMLFormElement) ? tmp$ : throwCCE();
      processCreateForm(closure$div, tmp$_0);
      return Unit;
    };
  }
  function createLink(div) {
    return EventListener(createLink$lambda(div));
  }
  function input($receiver, id) {
    var tmp$;
    return Kotlin.isType(tmp$ = $receiver.children[id], HTMLInputElement) ? tmp$ : throwCCE();
  }
  function param($receiver, id) {
    return to(id, input($receiver, id).value);
  }
  var utmParams;
  function main(args) {
    var tmp$;
    var div = Kotlin.isType(tmp$ = document.getElementById('app'), HTMLDivElement) ? tmp$ : throwCCE();
    var form = linkForm(createLink(div));
    div.appendChild(form);
  }
  function linkForm(listener) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10;
    var form = Kotlin.isType(tmp$ = document.createElement('form'), HTMLFormElement) ? tmp$ : throwCCE();
    form.id = 'loginform';
    var message = Kotlin.isType(tmp$_0 = document.createElement('a'), HTMLAnchorElement) ? tmp$_0 : throwCCE();
    message.id = 'message';
    message.style.wordWrap = 'break-word';
    var destinationContainer = Kotlin.isType(tmp$_1 = document.createElement('div'), HTMLDivElement) ? tmp$_1 : throwCCE();
    destinationContainer.id = 'destination';
    destinationContainer.className = 'input-group';
    var destinationLabel = Kotlin.isType(tmp$_2 = document.createElement('label'), HTMLLabelElement) ? tmp$_2 : throwCCE();
    destinationLabel.htmlFor = 'redirect';
    destinationLabel.textContent = 'Your destination URL:';
    var buttonGroup = Kotlin.isType(tmp$_3 = document.createElement('div'), HTMLDivElement) ? tmp$_3 : throwCCE();
    buttonGroup.className = 'input-group-btn';
    buttonGroup.id = 'hostContainer';
    var caret = Kotlin.isType(tmp$_4 = document.createElement('span'), HTMLSpanElement) ? tmp$_4 : throwCCE();
    caret.className = 'caret';
    caret.style.marginLeft = '10px';
    var hostValue = Kotlin.isType(tmp$_5 = document.createElement('span'), HTMLSpanElement) ? tmp$_5 : throwCCE();
    hostValue.id = 'hostValue';
    hostValue.textContent = 'Environment';
    var host = Kotlin.isType(tmp$_6 = document.createElement('button'), HTMLButtonElement) ? tmp$_6 : throwCCE();
    host.id = 'host';
    host.className = 'btn btn-default dropdown-toggle';
    host.setAttribute('data-toggle', 'dropdown');
    host.appendChild(hostValue);
    host.appendChild(caret);
    buttonGroup.appendChild(host);
    var options = Kotlin.isType(tmp$_7 = document.createElement('ul'), HTMLUListElement) ? tmp$_7 : throwCCE();
    options.className = 'dropdown-menu';
    options.appendChild(createOption(host, 'https://www.tutti.ch/'));
    options.appendChild(createOption(host, 'https://www.qa1.scmdev.ch/'));
    options.appendChild(createOption(host, 'https://www.qa2.scmdev.ch/'));
    buttonGroup.appendChild(options);
    var redirect = Kotlin.isType(tmp$_8 = document.createElement('input'), HTMLInputElement) ? tmp$_8 : throwCCE();
    redirect.type = 'text';
    redirect.id = 'redirect';
    redirect.className = 'form-control';
    destinationContainer.append(buttonGroup, redirect);
    var source = createUtmInputElement('utm_source', 'Source');
    var medium = createUtmInputElement('utm_medium', 'Medium');
    var campaign = createUtmInputElement('utm_campaign', 'Campaign');
    var term = createUtmInputElement('utm_term', 'Term');
    var content = createUtmInputElement('utm_content', 'Content');
    var header = Kotlin.isType(tmp$_9 = document.createElement('label'), HTMLLabelElement) ? tmp$_9 : throwCCE();
    header.textContent = 'UTM parameters:';
    var submit = Kotlin.isType(tmp$_10 = document.createElement('button'), HTMLButtonElement) ? tmp$_10 : throwCCE();
    submit.type = 'submit';
    submit.textContent = 'Create Dynamic Link';
    submit.className = 'btn btn-default btn-lg btn-block';
    form.append(message, lineBreak(), destinationLabel, destinationContainer, lineBreak(), header, lineBreak(), source, lineBreak(), medium, lineBreak(), campaign, lineBreak(), term, lineBreak(), content, lineBreak(), submit, lineBreak(), message);
    form.addEventListener('submit', listener);
    return form;
  }
  function createOption$lambda(closure$anchor, this$createOption) {
    return function (it) {
      var tmp$;
      it.preventDefault();
      println(closure$anchor.text);
      (tmp$ = this$createOption.children['hostValue']) != null ? (tmp$.textContent = closure$anchor.text) : null;
      return Unit;
    };
  }
  function createOption($receiver, target) {
    var tmp$, tmp$_0;
    var li = Kotlin.isType(tmp$ = document.createElement('li'), HTMLLIElement) ? tmp$ : throwCCE();
    var anchor = Kotlin.isType(tmp$_0 = document.createElement('a'), HTMLAnchorElement) ? tmp$_0 : throwCCE();
    anchor.href = '#';
    anchor.textContent = target;
    li.appendChild(anchor);
    anchor.addEventListener('click', EventListener(createOption$lambda(anchor, $receiver)));
    return li;
  }
  function createUtmInputElement(id, placeholder) {
    if (placeholder === void 0)
      placeholder = '';
    var tmp$;
    var input = Kotlin.isType(tmp$ = document.createElement('input'), HTMLInputElement) ? tmp$ : throwCCE();
    input.type = 'text';
    input.placeholder = placeholder;
    input.id = id;
    input.className = 'form-control';
    return input;
  }
  function lineBreak() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement('br'), HTMLBRElement) ? tmp$ : throwCCE();
  }
  _.processCreateForm_gm0kgn$ = processCreateForm;
  _.createLink_e0t6x9$ = createLink;
  _.input_ws6i9t$ = input;
  _.param_ws6i9t$ = param;
  Object.defineProperty(_, 'utmParams', {
    get: function () {
      return utmParams;
    }
  });
  _.main_kand9s$ = main;
  _.linkForm_otu8lm$ = linkForm;
  _.lineBreak = lineBreak;
  utmParams = listOf(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']);
  main([]);
  Kotlin.defineModule('output', _);
  return _;
}(typeof output === 'undefined' ? {} : output, kotlin);

//# sourceMappingURL=output.js.map
