from huggingface_hub import hf_hub_download

path = hf_hub_download(
    repo_id="Foolmannn/mrs-model",
    filename="similarity.pkl"
)

print(path)