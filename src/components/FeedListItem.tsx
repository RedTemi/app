import ColorPalette from '@Constants/colors';
import { Focuscheck, Session, Maybe, Scalars } from '../graphql/types.generated';
import { dayMonth } from '../lib/date';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Cell from '@Components/Cell';
import ArrowRight from '@Components/IconComponents/ArrowRightIcon';
import Row from '@Components/Row';
import Typography, { TypographyVariant } from '@Components/Typography';
import styles from '../style/FeedListItem';

export interface FeedListItemProps {
  item:
    | {
        __typename?: 'Note';
        createdAt: Maybe<Scalars['AWSDateTime']>;
        nodeId: Scalars['ID'];
        note: Maybe<Scalars['String']>;
        updatedAt: Maybe<Scalars['AWSDateTime']>;
      }
    | Focuscheck
    | Session;
  showDate?: boolean;
}

const FeedListItem = ({ item, showDate }: FeedListItemProps) => {
  const { navigate } = useNavigation();

  const { __typename: typeName, nodeId, createdAt, updatedAt } = item;

  const itemSerialized = JSON.stringify(item);

  const getTitle = () => {
    if (typeName === 'Note') {
      return item.note;
    }

    if (typeName === 'Focuscheck') {
      return item.title;
    }

    return null;
  };

  const renderSessionNumber = () => {
    if (typeName === 'Session') {
      return (
        <>
          &nbsp; Session &nbsp;
          {item.sessionNo}
        </>
      );
    }
    return null;
  };

  const onPress = () => {
    if (typeName) {
      navigate(typeName, { nodeId, itemSerialized });
    }
  };

  const styleContainers = [styles.container, typeName && typeName !== 'Session' && styles[typeName]];

  return (
    <TouchableOpacity key={nodeId} style={styleContainers} onPress={onPress}>
      <Row alignItems="center">
        <Cell style={styles.cellContent}>
          <Typography variant={TypographyVariant.title} numberOfLines={1} style={styles.title}>
            {showDate && dayMonth(updatedAt || createdAt)}
            {renderSessionNumber()}
          </Typography>
          <Typography variant={TypographyVariant.title} numberOfLines={1} style={styles.title}>
            {getTitle()}
          </Typography>
        </Cell>
        <Cell style={styles.arrowCell}>
          <ArrowRight size="xl" color={ColorPalette.black} />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
};

export default FeedListItem;
