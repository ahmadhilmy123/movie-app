import styled, { css } from "styled-components";

// Warna tombol berdasarkan varian
const colors = {
  primary: "#4361ee",
  secondary: "#b5179e",
};

// Ukuran tombol berdasarkan prop size atau ukuran
const sizeStyles = {
  // ukuran kecil sm atau small
  sm: css`
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  `,
  // ukuran sedang md atau medium
  md: css`
    font-size: 1rem;
    padding: 0.5rem 1rem;
  `,
  // ukuran besar lg atau large
  lg: css`
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
  `,
};

const Button = styled.button`
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  background-color: ${({ variant }) => colors[variant] || colors.primary};

  ${({ size }) => sizeStyles[size || "md"]}

  ${({ full }) =>
    full &&
    css`
      display: block;
      width: 100%;
    `}

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "secondary" ? "#a3138e" : "#364fc7"};
  }
`;

export default Button;
