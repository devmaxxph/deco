---
id: "engine_src.ClientPlugin"
title: "Class: ClientPlugin"
sidebar_label: "engine/src.ClientPlugin"
custom_edit_url: null
---

[engine/src](../modules/engine_src.md).ClientPlugin

## Hierarchy

- `Plugin`

  ↳ **`ClientPlugin`**

## Constructors

### constructor

• **new ClientPlugin**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `PluginConstuctor` & { `agentComponents?`: `FC`<`any`\>[] ; `clientPageLayout?`: [`PageLayout`](../modules/engine_src.md#pagelayout) ; `clientRoutes?`: [`PluginClientRoute`](../modules/engine_src.md#pluginclientroute)[] ; `drawerItems?`: [`PluginDrawerItem`](../modules/engine_src.md#plugindraweritem)[] ; `projectTemplates?`: `any`[] ; `spellTemplates?`: { `createdAt?`: `string` ; `graph`: { id: string; nodes: any; } ; `hash`: `string` ; `id`: `string` ; `name`: `string` ; `projectId`: `string` ; `updatedAt?`: `string`  }[]  } |

#### Overrides

Plugin.constructor

#### Defined in

[packages/engine/src/lib/plugin.ts:90](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L90)

## Properties

### agentComponents

• **agentComponents**: `FC`<{}\>[]

#### Defined in

[packages/engine/src/lib/plugin.ts:83](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L83)

___

### clientPageLayout

• `Optional` **clientPageLayout**: [`PageLayout`](../modules/engine_src.md#pagelayout)

#### Defined in

[packages/engine/src/lib/plugin.ts:85](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L85)

___

### clientRoutes

• `Optional` **clientRoutes**: [`PluginClientRoute`](../modules/engine_src.md#pluginclientroute)[]

#### Defined in

[packages/engine/src/lib/plugin.ts:86](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L86)

___

### completionProviders

• **completionProviders**: [`CompletionProvider`](../modules/engine_src.md#completionprovider)[]

#### Inherited from

Plugin.completionProviders

#### Defined in

[packages/engine/src/lib/plugin.ts:63](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L63)

___

### drawerItems

• `Optional` **drawerItems**: [`PluginDrawerItem`](../modules/engine_src.md#plugindraweritem)[]

#### Defined in

[packages/engine/src/lib/plugin.ts:84](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L84)

___

### inputTypes

• **inputTypes**: [`PluginIOType`](../modules/engine_src.md#pluginiotype)[]

#### Inherited from

Plugin.inputTypes

#### Defined in

[packages/engine/src/lib/plugin.ts:60](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L60)

___

### name

• **name**: `string`

#### Inherited from

Plugin.name

#### Defined in

[packages/engine/src/lib/plugin.ts:58](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L58)

___

### nodes

• **nodes**: [`MagickComponentArray`](../modules/engine_src.md#magickcomponentarray)<`any`\>

#### Inherited from

Plugin.nodes

#### Defined in

[packages/engine/src/lib/plugin.ts:59](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L59)

___

### outputTypes

• **outputTypes**: [`PluginIOType`](../modules/engine_src.md#pluginiotype)[]

#### Inherited from

Plugin.outputTypes

#### Defined in

[packages/engine/src/lib/plugin.ts:61](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L61)

___

### projectTemplates

• `Optional` **projectTemplates**: `any`[]

#### Defined in

[packages/engine/src/lib/plugin.ts:89](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L89)

___

### secrets

• **secrets**: [`PluginSecret`](../modules/engine_src.md#pluginsecret)[]

#### Inherited from

Plugin.secrets

#### Defined in

[packages/engine/src/lib/plugin.ts:62](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L62)

___

### spellTemplates

• `Optional` **spellTemplates**: { `createdAt?`: `string` ; `graph`: { id: string; nodes: any; } ; `hash`: `string` ; `id`: `string` ; `name`: `string` ; `projectId`: `string` ; `updatedAt?`: `string`  }[]

#### Defined in

[packages/engine/src/lib/plugin.ts:87](https://github.com/Oneirocom/MagickML/blob/f74165ec/packages/engine/src/lib/plugin.ts#L87)