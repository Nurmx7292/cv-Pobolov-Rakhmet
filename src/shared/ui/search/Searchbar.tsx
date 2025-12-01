import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchbarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const Searchbar = ({ value, onChange, placeholder = "Search" }: SearchbarProps) => {
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                "&": {
                    maxWidth: "320px",
                    width: "100%",
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "48px",
                },
                "& .MuiOutlinedInput-input": {
                    padding: "8.5px 14px 8.5px 0",
                },
            }}
        />
    );
};

