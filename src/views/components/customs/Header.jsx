import arrows from '../../../assets/icons/arrows.png';

export default function Header({
    title,
    onSort = null,
    sortable = true,
    visible = true,
}) {
    return (
        <th className={'px-4 py-2'}>
            {visible && (
                <div
                    className={sortable ? 'flex justify-between' : 'text-left'}
                >
                    <>{title}</>
                    {sortable && (
                        <img
                            src={arrows}
                            alt={'Sort by ' + title}
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
