import arrows from '../../../assets/icons/arrows.png';

export default function Header({
    name = '',
    width = '',
    onSort = null,
    sortable = true,
    visible = true,
}) {
    return (
        <th
            className={[
                'px-4 py-2',
                width,
                visible || 'w-12 border-white bg-white',
            ].join(' ')}
        >
            {visible && (
                <div
                    className={sortable ? 'flex justify-between' : 'text-left'}
                >
                    <>{name}</>
                    {sortable && (
                        <img
                            src={arrows}
                            alt={'Sort by ' + name}
                            width={20}
                            height={5}
                            onClick={onSort}
                        ></img>
                    )}
                </div>
            )}
        </th>
    );
}
