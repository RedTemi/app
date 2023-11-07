import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { dayMonth } from '../lib/date';
import styles from '../style/feed_list_item';

import { Row, Cell } from './flexbox';
import { ArrowRight } from './icons';
import Typography from './typography';

// TODO: fix item prop type once codegen will be added
export interface FeedListItemProps {
  item: Record<string, unknown>;
  showDate?: boolean;
}

const FeedListItem = ({ item, showDate }: FeedListItemProps) => {
  const { navigate } = useNavigation();

  const { __typename: typeName, nodeId, sessionNumber, createdAt, updatedAt } = item;

  const itemSerialized = JSON.stringify(item);

  const title = typeName === 'Note' ? item.note : item.title;

  const onPress = () => {
    navigate(typeName, { nodeId, itemSerialized });
  };

  const styleContainer = [styles.container, styles[typeName]];

  return (
    <TouchableOpacity key={nodeId} style={styleContainer} onPress={onPress}>
      <Row alignItems="center">
        <Cell style={styles.cellContent}>
          <Typography numberOfLines={1} style={styles.title}>
            {showDate && dayMonth(updatedAt || createdAt)}
            {sessionNumber && (
              <>
                &nbsp; Session &nbsp;
                {sessionNumber}
              </>
            )}
          </Typography>
          <Typography variant="title" numberOfLines={1} style={styles.title}>
            {title}
          </Typography>
        </Cell>
        <Cell style={styles.arrowCell}>
          <ArrowRight size="xl" color="black" />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
};

export default FeedListItem;
