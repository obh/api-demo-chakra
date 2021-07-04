import React from "react"
import Prism from "prismjs"
import  "../plugins/prism-line.js"
import highlightLines from '../plugins/prism-line'

export class PrismCode extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  componentDidMount() {
    this.highlight()
  }
  componentDidUpdate() {
    this.highlight()
  }
  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
      highlightLines()
    }
  }
  render() {
    const { code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")} data-line="5-10" >
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    )
  }
}