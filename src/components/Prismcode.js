import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import styled from 'styled-components'


export const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

export const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`


export class PrismCode extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.ref = React.createRef()
  // }
  // componentDidMount() {
  //   this.highlight()
  // }
  // componentDidUpdate() {
  //   this.highlight()
  // }
  // highlight = () => {
  //   if (this.ref && this.ref.current) {
  //     // Prism.highlightElement(this.ref.current)
  //     // highlightLines()
  //   }
  // }
  render() {
    const { code, plugins, language, lineEdited } = this.props
    console.log("LINE EDITED -> ", lineEdited)
    return (
      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
       {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => {
          //console.log(i);
          const lineProps = getLineProps({ line, key: i });
          if (i === lineEdited) {
            lineProps.className = `${lineProps.className} highlight-line`;
          }
          return (
            <div {...lineProps}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          );
        })}
      </Pre>
    )}
  </Highlight>
    )
  }
}