import arrows from '../../../assets/icons/arrows.png';

export default function Header({ title, width = '32', onSort }) {
    return (
        <th className="px-4 py-2">
            <div className={'flex justify-between min-w-' + width}>
                <>{title}</>
                <img
                    src={arrows}
                    alt={'Sort by ' + title}
                    width={20}
                    height={5}
                    onClick={onSort}
                ></img>
            </div>
        </th>
    );
}
