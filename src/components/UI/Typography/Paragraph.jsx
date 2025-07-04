const Paragraph = ({ children, style = {}, ...props }) => {
  const defaultStyle = {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1em',
    color: '#444',
    ...style,
  };

  return <p {...props} style={defaultStyle}>{children}</p>;
};

export default Paragraph;
