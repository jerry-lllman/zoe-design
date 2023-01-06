

export interface ImageComponentType {
	id: string,
	type: 'image',
	rootType: CLASSIFY, // TODO: 这个是大的集合
	title: string,
	value: string,
	icon: any, // todo
	style: React.CSSProperties
}
