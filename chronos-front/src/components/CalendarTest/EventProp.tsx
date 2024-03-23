
// interface Props {
// 	title: string,
// 	date: DateTime,
//
// }
function EventProp(eventInfo) {


	return (
		<div
			className={'flex flex-col'}
		>
			<span
				className={'text-s bg-red text-black'}
			>
				{eventInfo.event.startStr}
			</span>
			<span
				className={'text-sm'}
			>
				{eventInfo.event.title}
			</span>
		</div>
	);
}

export default EventProp;