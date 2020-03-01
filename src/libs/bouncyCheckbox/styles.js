export const iconContainer = (
  size,
  checked,
  borderRadius,
  borderColor,
  fillColor,
  unfillColor
) => {
  return {
    width: size,
    borderColor,
    borderRadius,
    height: size,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? fillColor : unfillColor
  };
};

export const textStyle = (_checked, textColor, fontFamily, fontSize) => {
  return {
    fontFamily,
    fontSize,
    color: textColor
  };
};

export default {
  container: {
    margin: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  textContainer: { marginLeft: 10 }
};
