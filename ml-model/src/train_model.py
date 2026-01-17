import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("../data/raw/ml_training_dataset.csv")

# Target encoding
df['eligible'] = df['eligible'].map({'Yes': 1, 'No': 0})

categorical_cols = [
    'gender',
    'category',
    'state',
    'occupation',
    'disability',
    'is_minority'
]

encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = df[col].astype(str)

    values = df[col].tolist()
    values.append("Unknown")

    le.fit(values)
    df[col] = le.transform(df[col])

    encoders[col] = le

X = df[
    [
        'age',
        'gender',
        'category',
        'state',
        'occupation',
        'annual_income',
        'disability',
        'is_minority'
    ]
]

y = df['eligible']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

joblib.dump(model, "../data/processed/welfare_decision_tree_model.pkl")
joblib.dump(encoders, "../data/processed/encoders.pkl")

print("✅ Model trained and saved successfully")
