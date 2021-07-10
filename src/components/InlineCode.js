
export default function InlineCode({ children }) {
    const divStyle = {
        color: '#f8f8f2',
        backgroundColor: '#272822',
        borderRadius: '0.3rem',
        padding: "1px 1px 2px 2px",
        //whiteSpace: "nowrap"
    }
    return (
      <span style={divStyle}>{children}</span>
    );
  }