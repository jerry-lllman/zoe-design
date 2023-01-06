
// // TODO 这个是真正的组件的类型
// export enum COMPONENT_TYPE_COLLECTION {
// 	TEXT = 'text',
// }

export interface TextComponentType {
	id: string,
	type: 'text',
	rootType: CLASSIFY, // TODO: 这个是大的集合
	title: string,
	value: string,
	icon: any, // todo
	style: React.CSSProperties
}

