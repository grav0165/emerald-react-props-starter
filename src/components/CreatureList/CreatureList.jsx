import CreatureItem from '../CreatureItem/CreatureItem';

function CreatureList({creatureList}) {
    return (
        <ul>
            {
            creatureList.map(creature =>
                <CreatureItem key={CreatureItem.id} creature={creature} />
            )
            }
        </ul>
    )
}
export default CreatureList;