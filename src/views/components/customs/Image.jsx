export default function Image({
    src,
    alt,
    width = 20,
    height = 20,
    interactions = '',
    onClick,
}) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={'rounded-lg ' + interactions}
            onClick={onClick}
        ></img>
    );
}
