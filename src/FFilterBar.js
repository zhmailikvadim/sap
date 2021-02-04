import {
    Input,
    FilterGroupItem,
    VariantManagement,
    Switch,
    Option,
    Select,
    MultiComboBoxItem,
    MultiComboBox,
    DatePicker,
    FilterBar
} from "@ui5/webcomponents-react";

import React from "react";

function FFilterBar(props) {
    return (
        <FilterBar
            filterBarExpanded={false}
            activeFiltersCount={0}
            considerGroupName={false}
            filterContainerWidth="13.125rem"
            loading={false}
            onClear={function noRefCheck() { }}
            onFiltersDialogCancel={null}
            onFiltersDialogClear={function noRefCheck() { }}
            onFiltersDialogClose={function noRefCheck() { }}
            onFiltersDialogOpen={function noRefCheck() { }}
            onFiltersDialogSave={function noRefCheck() { }}
            onFiltersDialogSearch={function noRefCheck() { }}
            onFiltersDialogSelectionChange={function noRefCheck() { }}
            onGo={function noRefCheck() { }}
            onRestore={function noRefCheck() { }}
            onToggleFilters={function noRefCheck() { }}
            search={<Input disabled={false} highlight={false} placeholder="Search" readonly={false} required={false} showSuggestions={false} type="Text" valueState="None" />}
            showClearButton={false}
            showClearOnFB={false}
            showFilterConfiguration={false}
            showGo={false}
            showGoOnFB={false}
            showRestoreButton={false}
            showRestoreOnFB={false}
            showSearchOnFiltersDialog={false}
            useToolbar
            variants={<VariantManagement closeOnItemSelect disabled={false} level="H4" onSelect={function noRefCheck() { }} placement="Bottom" popupTitle="Variants" selectedKey="2" variantItems={[{ key: '1', label: 'Variant 1' }, { key: '2', label: 'Variant 2' }]} />}
        >
            <FilterGroupItem
                groupName="default"
                label="Input"
                required={false}
                visible
                visibleInFilterBar
            >
                <Input
                    disabled={false}
                    highlight={false}
                    placeholder="Placeholder"
                    readonly={false}
                    required={false}
                    showSuggestions={false}
                    type="Text"
                    valueState="None"
                />
            </FilterGroupItem>
            <FilterGroupItem
                groupName="Custom Group"
                label="Switch"
                required={false}
                visible
            >
                <Switch
                    checked={false}
                    disabled={false}
                    graphical={false}
                />
            </FilterGroupItem>
            <FilterGroupItem
                groupName="default"
                label="SELECT w/ initial selected"
                required={false}
                visible
            >
                <Select
                    disabled={false}
                    required={false}
                    valueState="None"
                >
                    <Option selected={false}>
                        Option 1
      </Option>
                    <Option selected>
                        Option 2
      </Option>
                    <Option selected={false}>
                        Option 3
      </Option>
                    <Option selected={false}>
                        Option 4
      </Option>
                </Select>
            </FilterGroupItem>
            <FilterGroupItem
                groupName="Custom Group"
                label="SELECT w/o initial selected"
                required={false}
                visible
            >
                <Select
                    disabled={false}
                    required={false}
                    valueState="None"
                >
                    <Option
                        data-key="Test 1"
                        icon="add"
                        selected
                    >
                        Test 1
      </Option>
                    <Option
                        data-key="Test 2"
                        icon="add"
                        selected={false}
                    >
                        Test 2
      </Option>
                    <Option
                        data-key="Test 3"
                        icon="add"
                        selected={false}
                    >
                        Test 3
      </Option>
                    <Option
                        data-key="Test 4"
                        icon="add"
                        selected={false}
                    >
                        Test 4
      </Option>
                    <Option
                        data-key="Test 5"
                        icon="add"
                        selected={false}
                    >
                        Test 5
      </Option>
                </Select>
            </FilterGroupItem>
            <FilterGroupItem
                groupName="Group 1"
                label="MultBox w/ initial selected"
                required={false}
                visible
            >
                <MultiComboBox
                    allowCustomValues={false}
                    disabled={false}
                    open={false}
                    readonly={false}
                    required={false}
                    valueState="None"
                >
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 1"
                    />
                    <MultiComboBoxItem
                        selected
                        text="MultiComboBoxItem 2"
                    />
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 3"
                    />
                    <MultiComboBoxItem
                        selected
                        text="MultiComboBoxItem 4"
                    />
                </MultiComboBox>
            </FilterGroupItem>
            <FilterGroupItem
                groupName="Group 2"
                label="MultBox w/o initial selected"
                required={false}
                visible
            >
                <MultiComboBox
                    allowCustomValues={false}
                    disabled={false}
                    open={false}
                    readonly={false}
                    required={false}
                    valueState="None"
                >
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 1"
                    />
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 2"
                    />
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 3"
                    />
                    <MultiComboBoxItem
                        selected={false}
                        text="MultiComboBoxItem 4"
                    />
                </MultiComboBox>
            </FilterGroupItem>
            <FilterGroupItem
                groupName="Group 2"
                label="Date Picker"
                required={false}
                visible
            >
                <DatePicker
                    disabled={false}
                    hideWeekNumbers={false}
                    primaryCalendarType="Gregorian"
                    readonly={false}
                    required={false}
                    valueState="None"
                />
            </FilterGroupItem>
        </FilterBar>
    );
}
export default FFilterBar;
