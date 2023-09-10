
type RME<T> = React.MouseEvent<T>

type RMEH<T> = React.MouseEventHandler<T>

// Mainly for [R]eact [C]hange [E]vent of HTML input select or textarea elements
type RCE<T,> = React.ChangeEvent<T>

// Mainly for [R]eact [U]I [E]vent of HTML containers
type RUE<T,> = React.UIEvent<T>

type RCEH<T,> = React.ChangeEventHandler<T>

type RDRSSA<T,> = React.Dispatch<React.SetStateAction<T>>