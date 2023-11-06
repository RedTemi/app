import { StatusQuo } from '@Graphql/types.generated';
import { yearMonthDay } from '@Lib/date';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Cell from '@Components/Cell';
import ArrowRight from '@Components/IconComponents/ArrowRightIcon';
import Row from '@Components/Row';
import { Screen } from '@Screens/index';

import styles from '../style/statusQuoListItem';

import Typography, { TypographyVariant } from './Typography';

export interface StatusQuoListItemProps {
  item: Partial<StatusQuo>;
  isCurrentStatusQuo: boolean;
}

const StatusQuoListItem = ({ item, isCurrentStatusQuo }: StatusQuoListItemProps) => {
  const { navigate } = useNavigation();

  const { nodeId, createdAt, statusQuo } = item;

  const onPress = () => {
    navigate(Screen.EditStatusQuo, { nodeId, statusQuo, editable: isCurrentStatusQuo });
  };

  return (
    <TouchableOpacity key={nodeId} style={styles.container} onPress={onPress}>
      <Row alignItems="center" style={{ paddingVertical: 4 }}>
        <Cell style={styles.cellContent}>
          {createdAt && (
            <Typography variant={TypographyVariant.title} numberOfLines={1} style={styles.title}>
              {yearMonthDay(createdAt)}
            </Typography>
          )}
          <Typography variant={TypographyVariant.title} numberOfLines={1} style={styles.title}>
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
