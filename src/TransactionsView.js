
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Picker,
    Button,
    Alert
} from 'react-native';
import {
    getBudget,
    getAccounts,
    getExpenses,
    getTypes,
    saveTransaction
} from './Remote';
import DatePicker from 'react-native-datepicker'

const baseTransaction = {
    date: new Date(),
    amount: "0",
    account_id: 0,
    type_id: 0,
    expense_id: null,
    comment: ""
};

export default class TransactionsView extends Component {
    constructor() {
        super();
        this.state = {
            budget: {
                afterAll: 0,
                afterAuto: 0
            },
            accounts: [],
            expenses: [],
            types: [],
            newTransaction: Object.assign({}, baseTransaction)
        };
        this.updateBudget();
        getAccounts().then(async resp => {
            const accounts = await resp.json();
            this.setState(
                _state => {
                    _state.accounts = accounts;
                    _state.newTransaction.account_id = accounts.find(x => x.name == "Default").id;
                    baseTransaction.account_id = _state.newTransaction.account_id;
                    return _state;
                });
        });
        getExpenses().then(async resp => {
            this.setState({ expenses: await resp.json() });
        });
        getTypes().then(async resp => {
            const types = await resp.json();
            this.setState(
                _state => {
                    _state.types = types;
                    _state.newTransaction.type_id = types.find(x => x.name == "Other").id;
                    baseTransaction.type_id = _state.newTransaction.type_id;
                    return _state;
                });
        });
    }
    async updateBudget() {
        const resp = await getBudget();
        this.setState({ budget: await resp.json() });
    }
    async save(trans) {
        trans.date = new Date(trans.date);
        trans.amount = Math.round(parseFloat(trans.amount) * 100);
        const resp = await saveTransaction(trans);
        if (resp.ok) {
            this.updateBudget();
            this.setState(_state => {
                _state.newTransaction = Object.assign({}, baseTransaction);
                return _state;
            });
        } else {
            Alert.alert(await resp.text());
        }
    }
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View>
                <Text>Budget:</Text>
                <Text>After all: {(this.state.budget.afterAll / 100).toFixed(2)}</Text>
                <Text>After auto: {(this.state.budget.afterAuto / 100).toFixed(2)}</Text>
                <Text>{'\nNew transaction\n'}</Text>
                <Text>Date:</Text>
                <DatePicker
                    date={this.state.newTransaction.date}
                    showIcon={false}
                    mode="date"
                    format="YYYY/MM/DD"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                        this.setState(_state => {
                            _state.newTransaction.date = date;
                            return _state;
                        })
                    }}
                />
                <Text>Amount:</Text>
                <TextInput
                    value={this.state.newTransaction.amount}
                    keyboardType="numeric"
                    onChangeText={amount => {
                        this.setState(_state => {
                            _state.newTransaction.amount = amount;
                            return _state;
                        });
                    }}
                />
                <Text>Account:</Text>
                <Picker
                    selectedValue={this.state.newTransaction.account_id}
                    onValueChange={id => this.setState(_state => {
                        _state.newTransaction.account_id = id;
                        return _state;
                    })}>
                    {this.state.accounts.map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
                </Picker>
                <Text>Type:</Text>
                <Picker
                    selectedValue={this.state.newTransaction.type_id}
                    onValueChange={id => this.setState(_state => {
                        _state.newTransaction.type_id = id;
                        return _state;
                    })}>
                    {this.state.types.map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
                </Picker>
                <Text>Expense:</Text>
                <Picker
                    selectedValue={this.state.newTransaction.expense_id}
                    onValueChange={id => this.setState(_state => {
                        _state.newTransaction.expense_id = id;
                        return _state;
                    })}>
                    <Picker.Item key="-1" label="N/A" value="" />
                    {this.state.expenses.map(x => <Picker.Item key={x.id} label={x.name} value={x.id} />)}
                </Picker>
                <Text>Comment:</Text>
                <TextInput
                    value={this.state.newTransaction.comment}
                    onChangeText={comment => {
                        this.setState(_state => {
                            _state.newTransaction.comment = comment;
                            return _state;
                        })
                    }}
                />
                <Button
                    title="Save"
                    onPress={this.save.bind(this, this.state.newTransaction)}
                />
            </View>
        );
    }
}