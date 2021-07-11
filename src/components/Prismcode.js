import React from "react"
import {
  Button,
  Flex,
  Spacer,
  useClipboard,
} from '@chakra-ui/react';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import styled from 'styled-components'
import '../css/prism.css'


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

// To support multiple tabls, we will have to pass multiple props here and render each one of those
// the copy button in that case might become little more complicated. 
function PrismCode(props) {
  
    const { code, plugins, language, highlightStart, highlightEnd } = props
    const { hasCopied, onCopy } = useClipboard(code)

    return (
      <>

      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
       {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {/* Start code for copy button */}
        <Flex mb={2}>
          <Spacer/>
          <Button colorScheme="teal" size="xs" onClick={onCopy} ml={2}> {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Flex>
        {/* End code for copy button */}
        {tokens.map((line, i) => {
          // console.log(line, i);
          const lineProps = getLineProps({ line, key: i });
          if (i >= highlightStart && i <= highlightEnd) {
            // console.log("highlighting line....", i)
            // used from Prism.css
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
      </>
    )
  }
// }
export default PrismCode;