
// interface Props {
// 	title: string,
// 	date: DateTime,
//
// }
import tinycolor from "tinycolor2";
function EventProp(eventInfo: any) {

	return (
		<div
			className={`flex flex-col`}
		>
			<span
				className={
					tinycolor(eventInfo.event.extendedProps.color).isLight() ?
						"text-gray-900 " : "text-white " +
					'text-sm font-semibold'
				}
			>
				{eventInfo.event.title}
			</span>
		</div>
	);
}

export default EventProp;