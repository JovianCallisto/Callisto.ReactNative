import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Paragraph as ParagraphProps } from '@rocket.chat/message-parser';

import Hashtag from '../Hashtag';
import Link from './Link';
import Plain from './Plain';
import Bold from './Bold';
import Strike from './Strike';
import Italic from './Italic';
import Emoji from './Emoji';
import Mention from './Mention';
import InlineCode from './InlineCode';
import { UserMention } from '../../message/interfaces';

interface IParagraphProps {
	value: ParagraphProps['value'];
	mentions?: UserMention[];
	channels?: {
		name: string;
		_id: number;
	}[];
	navToRoomInfo?: Function;
	style?: StyleProp<ViewStyle>[];
}

const Inline: React.FC<IParagraphProps> = ({ value, mentions, channels, navToRoomInfo, style }) => (
	<>
		{value.map(block => {
			switch (block.type) {
				case 'PLAIN_TEXT':
					return <Plain value={block.value} />;
				case 'BOLD':
					return <Bold value={block.value} />;
				case 'STRIKE':
					return <Strike value={block.value} />;
				case 'ITALIC':
					return <Italic value={block.value} />;
				case 'LINK':
					return <Link value={block.value} />;
				case 'MENTION_USER':
					return <Mention value={block.value} navToRoomInfo={navToRoomInfo} mentions={mentions} style={style} />;
				case 'EMOJI':
					return <Emoji value={block.value} />;
				case 'MENTION_CHANNEL':
					return <Hashtag hashtag={block.value.value} navToRoomInfo={navToRoomInfo} channels={channels} style={style} />;
				case 'INLINE_CODE':
					return <InlineCode value={block.value} style={style} />;
				default:
					return null;
			}
		})}
	</>
);

export default Inline;
