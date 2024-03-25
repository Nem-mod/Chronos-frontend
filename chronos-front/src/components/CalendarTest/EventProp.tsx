
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
				className={'text-sm'}
			>
				{eventInfo.event.title}
			</span>
		</div>
	);
}

export default EventProp;