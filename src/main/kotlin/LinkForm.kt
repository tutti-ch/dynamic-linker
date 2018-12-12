import org.w3c.dom.HTMLAnchorElement
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLFormElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLLIElement
import org.w3c.dom.HTMLLabelElement
import org.w3c.dom.HTMLSpanElement
import org.w3c.dom.HTMLUListElement
import org.w3c.dom.events.EventListener
import org.w3c.dom.get
import kotlin.browser.document

fun linkForm(listener: EventListener): HTMLFormElement {
    val form = document.createElement("form") as HTMLFormElement
    form.id = "loginform"

    val message = document.createElement("a") as HTMLAnchorElement
    message.id = "message"
    message.style.wordWrap = "break-word"

    val destinationContainer = document.createElement("div") as HTMLDivElement
    destinationContainer.id = "destination"
    destinationContainer.className = "input-group"

    val destinationLabel = document.createElement("label") as HTMLLabelElement
    destinationLabel.htmlFor = "redirect"
    destinationLabel.textContent = "Your destination URL:"


    val buttonGroup = document.createElement("div") as HTMLDivElement
    buttonGroup.className = "input-group-btn"
    buttonGroup.id = "hostContainer"

    val caret = document.createElement("span") as HTMLSpanElement
    caret.className = "caret"
    caret.style.marginLeft = "10px"

    val hostValue = document.createElement("span") as HTMLSpanElement
    hostValue.id = "hostValue"
    hostValue.textContent = "Environment"

    val host = document.createElement("button") as HTMLButtonElement
    host.id = "host"
    host.className = "btn btn-default dropdown-toggle"
    host.setAttribute("data-toggle", "dropdown")
    host.appendChild(hostValue)
    host.appendChild(caret)

    buttonGroup.appendChild(host)

    val options = document.createElement("ul") as HTMLUListElement
    options.className = "dropdown-menu"
    options.appendChild(host.createOption("https://www.tutti.ch/"))
    options.appendChild(host.createOption("https://www.qa1.scmdev.ch/"))
    options.appendChild(host.createOption("https://www.qa2.scmdev.ch/"))

    buttonGroup.appendChild(options)

    val redirect = document.createElement("input") as HTMLInputElement
    redirect.type = "text"
    redirect.id = "redirect"
    redirect.className = "form-control"

    destinationContainer.append(buttonGroup, redirect)


    val source = createUtmInputElement("utm_source", "Source")
    val medium = createUtmInputElement("utm_medium", "Medium")
    val campaign = createUtmInputElement("utm_campaign", "Campaign")
    val term = createUtmInputElement("utm_term", "Term")
    val content = createUtmInputElement("utm_content", "Content")

    val header = document.createElement("label") as HTMLLabelElement
    header.textContent = "UTM parameters:"

    val submit = document.createElement("button") as HTMLButtonElement
    submit.type = "submit"
    submit.textContent = "Create Dynamic Link"
    submit.className = "btn btn-default btn-lg btn-block"

    form.append(
        message,
        lineBreak(),
        destinationLabel,
        destinationContainer,
        lineBreak(),
        header,
        lineBreak(),
        source,
        lineBreak(),
        medium,
        lineBreak(),
        campaign,
        lineBreak(),
        term,
        lineBreak(),
        content,
        lineBreak(),
        submit,
        lineBreak(),
        message
    )

    form.addEventListener("submit", listener)
    return form
}

private fun HTMLButtonElement.createOption(target: String): HTMLLIElement {
    val li = document.createElement("li") as HTMLLIElement
    val anchor = document.createElement("a") as HTMLAnchorElement
    anchor.href = "#"
    anchor.textContent = target
    li.appendChild(anchor)
    anchor.addEventListener("click", EventListener {
        it.preventDefault()
        println(anchor.text)
        children["hostValue"]?.textContent = anchor.text
    })
    return li
}

private fun createUtmInputElement(id: String, placeholder: String = ""): HTMLInputElement {
    val input = (document.createElement("input") as HTMLInputElement)
    input.type = "text"
    input.placeholder = placeholder
    input.id = id
    input.className = "form-control"
    return input
}