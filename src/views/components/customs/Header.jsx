import arrows from '../../../assets/icons/arrows.png';

export default function Header({
    name = '',
    width = '',
    onSort = null,
    tags = [],
}) {
    return (
        <th
            className={[
                'px-4 py-2',
                width,
                tags.includes('visible') || 'w-12 border-white bg-white',
            ].join(' ')}
        >
            {tags.includes('visible') && (
                <div
                    className={
                        tags.includes('sortable')
                            ? 'flex justify-between'
                            : 'text-left'
                    }
                >
                    <>{name}</>
                    {tags.includes('sortable') && (
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
