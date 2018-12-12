import org.w3c.dom.HTMLDivElement
import kotlin.browser.document

fun main(args: Array<String>) {
    val div = document.getElementById("app") as HTMLDivElement
    val form = linkForm(createLink(div))
    div.appendChild(form)
}