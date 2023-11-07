import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { yearMonthDay } from '../lib/date';
import styles from '../style/statusQuoListItem';
import { StatusQuo } from '../../types.generated';

import { Row, Cell } from './flexbox';
import { ArrowRight } from './icons';
import Typography from './typography';

export interface StatusQuoListItemProps {
  item: StatusQuo;
  isCurrentStatusQuo: boolean;
}

const StatusQuoListItem = ({ item, isCurrentStatusQuo }: StatusQuoListItemProps) => {
  const { navigate } = useNavigation();

  const { nodeId, createdAt, statusQuo } = item;

  const onPress = () => {
    navigate('EditSQ', { nodeId, statusQuo, editable: isCurrentStatusQuo });
  };

  return (
    <TouchableOpacity key={nodeId} style={styles.container} onPress={onPress}>
      <Row alignItems="center" style={{ paddingVertical: 4 }}>
        <Cell style={styles.cellContent}>
          <Typography variant="title" numberOfLines={1} style={styles.title}>
            {yearMonthDay(createdAt)}
          </Typography>
          <Typography numberOfLines={1} style={styles.title}>
            {statusQuo}
          </Typography>
        </Cell>
        <Cell style={styles.arrowCell}>
          <ArrowRight size="xl" color="black" />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
};

export default StatusQuoListItem;
