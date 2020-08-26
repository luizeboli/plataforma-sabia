import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { InputField, SelectField, Watcher } from '../../Form';
import { CircularButton } from '../../Button';
import { Cell, Row } from '../../Common/Layout';
import Price from '../../Price';

const WatcherText = styled.div`
	height: 4.4rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const RightContent = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const CostsTable = ({ item, index, form, remove, collection }) => {
	const nameString = `${collection}[${index}]`;

	return (
		<>
			<Row key={item.id} align="center">
				<input
					name={`${nameString}.id`}
					ref={form.register({ required: false })}
					type="hidden"
				/>

				<Cell col={2}>
					<InputField
						form={form}
						name={`${nameString}.description`}
						placeholder="Descrição"
						validation={{ required: true }}
						defaultValue={item.description}
					/>
				</Cell>
				<Cell>
					<SelectField
						form={form}
						name={`${nameString}.type`}
						placeholder="Tipo"
						validation={{ required: true }}
						defaultValue={item.type}
						options={[
							{
								value: 'service',
								label: 'Serviço',
							},
							{
								value: 'raw_input',
								label: 'Insumo',
							},
							{
								value: 'equipment',
								label: 'Equipamento',
							},
							{
								value: 'others',
								label: 'Outro',
							},
						]}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name={`${nameString}.quantity`}
						placeholder="Quantidade"
						defaultValue={item.quantity}
						validation={{
							required: true,
							pattern: {
								value: /^[0-9]*$/,
								message: 'Você deve digitar apenas números',
							},
						}}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name={`${nameString}.value`}
						placeholder="Valor"
						defaultValue={item.value}
						validation={{
							required: true,
							pattern: {
								value: /^[0-9]*$/,
								message: 'Você deve digitar apenas números',
							},
						}}
					/>
				</Cell>

				<Cell>
					<Watcher
						form={form}
						property={collection}
						index={index}
						render={(element) => {
							const value =
								element && element.value
									? parseFloat(element.value).toFixed(2)
									: '';
							const quantity =
								element && element.quantity ? parseInt(element.quantity, 10) : '';
							const totalPrice = (value * quantity).toFixed(2);

							return (
								<WatcherText>
									<div>
										<Price amount={totalPrice} />
									</div>
								</WatcherText>
							);
						}}
					/>
				</Cell>

				<RightContent>
					<CircularButton
						name={`${nameString}_remove_button`}
						size="small"
						variant="remove"
						shortPadding
						height={1.75}
						width={1.75}
						onClick={(event) => {
							event.preventDefault();
							remove(index);
						}}
					>
						<FaMinus />
					</CircularButton>
				</RightContent>
			</Row>
		</>
	);
};

CostsTable.propTypes = {
	collection: PropTypes.string.isRequired,
	form: PropTypes.shape({
		register: PropTypes.func,
	}).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string,
		description: PropTypes.string,
		value: PropTypes.string,
		quantity: PropTypes.string,
		type: PropTypes.string,
	}).isRequired,
	index: PropTypes.number.isRequired,
	remove: PropTypes.func,
};

CostsTable.defaultProps = {
	remove: () => {},
};

export default CostsTable;
