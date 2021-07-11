
export default function InlineCode({ children }) {
    const divStyle = {
        backgroundColor: '#ffeff0',
        borderRadius: '0.2rem',
        padding: "0.1rem .3rem .2rem",
        overflowWrap : "break-word",
        //whiteSpace: "nowrap"
    }
    return (
      <span style={divStyle}>{children}</span>
    );
  }