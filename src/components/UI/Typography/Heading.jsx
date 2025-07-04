const Heading = ({ children, level = 1, style = {}, ...props }) => {
  const Tag = `h${level}`;
  const defaultStyle = {
    fontSize: level === 1 ? '2rem' : '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5em',
    ...style,
  };

  return <Tag {...props} style={defaultStyle}>{children}</Tag>;
};

export default Heading;
