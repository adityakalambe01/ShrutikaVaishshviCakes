interface SelectOption {
	label: string;
	value: string;
}

export const cakeBudgetCategoriesConstant: SelectOption[] = [
	{ label: "Under ₹ 250", value: "under250" },
	{ label: "₹ 250 - ₹ 500", value: "250-500" },
	{ label: "₹ 500 - ₹ 1000", value: "500-1000" },
	{ label: "₹ 1000+", value: "1000plus" },
]

export const cakeSizePreferenceConstant: SelectOption[] = [
	{ label: "Small (4-6 servings)", value: "small" },
	{ label: "Medium (10-15 servings)", value: "medium" },
	{ label: "Large (20-30 servings)", value: "large"},
	{ label: "Extra Large (40+ servings)", value: "extraLarge"},
]