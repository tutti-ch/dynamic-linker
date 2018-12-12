import org.w3c.dom.*
import org.w3c.dom.events.EventListener
import org.w3c.dom.url.URL
import kotlin.browser.document
import kotlin.dom.appendText
import kotlin.dom.clear

fun processCreateForm(div: HTMLDivElement, form: HTMLFormElement) {
    val url = URL("https://tutti.page.link/")
    val redirect = URL(extractDestinationUrl(form))

    val apn = if (redirect.toString() != "https://www.tutti.ch/") {
        "ch.tutti.debug"
    } else "ch.tutti"
    url.searchParams.append("apn", apn)

    utmParams
        .forEach { id ->
            val (name, value) = form.param(id)
            if (value.isNotEmpty()) {
                redirect.searchParams.append(name, value)
            }
        }


    val link = redirect.toString()

    url.searchParams.append("link", link)


    val message = form.children["message"] as HTMLAnchorElement
    message.clear()
    message.appendText(url.toString())
    message.href = url.toString()

    val hiddenInput = document.createElement("input") as HTMLInputElement
    hiddenInput.id = "hiddenInput"
    hiddenInput.value = url.toString()
    form.appendChild(hiddenInput)
    hiddenInput.select()
    document.execCommand("copy")
    form.removeChild(hiddenInput)
}

private fun extractDestinationUrl(form: HTMLFormElement): String {
    val container = form.children["destination"] as HTMLDivElement

    val host = document.getElementById("hostValue") as HTMLSpanElement
    val redirect = container.children["redirect"] as HTMLInputElement
    val urlPath = host.textContent + redirect.value
    println(urlPath)

    return urlPath
}

fun createLink(div: HTMLDivElement) = EventListener {
    it.preventDefault()
    processCreateForm(div, it.target as HTMLFormElement)
}

fun HTMLFormElement.input(id: String): HTMLInputElement = children[id] as HTMLInputElement

fun HTMLFormElement.param(id: String): Pair<String, String> = id to input(id).value

val utmParams = listOf("utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content")


