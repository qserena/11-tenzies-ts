export default function Die(props: {
    value: number
    isHeld: boolean
    handleClick: React.MouseEventHandler<HTMLDivElement>
}) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF',
    }
    return (
        <div className="die--face" style={styles} onClick={props.handleClick}>
            <h2>{props.value}</h2>
        </div>
    )
}
