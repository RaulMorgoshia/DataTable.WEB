import { Component, OnInit } from '@angular/core';
import { ItemsServiceService } from '../../services/items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DraggableColumnDirective } from '../../directives/draggable-column.directive';
import { Item } from '../../models/item';
import { CreateItemService } from '../../services/create-item.service';
import { DeleteItemService } from '../../services/delete-item.service';
import { UpdateItemService } from '../../services/update-item.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, DraggableDirective, DraggableColumnDirective],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  items: Item[] = [];
  selectedItems: Set<number> = new Set();
  isOpen = false;
  position = { top: '30%', left: '40%' };
  editItem: Item = { id: 0, no: '', name: '', description: '', price: 0 };

  constructor(
    private itemsService: ItemsServiceService,
    private createItemService: CreateItemService,
    private deleteItemService: DeleteItemService,
    private updateItemService: UpdateItemService,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemsService.getItems().subscribe(
      (data: Item[]) => (this.items = data),
      (error) => console.error('Error loading items', error)
    );
  }

  onRowSelect(item: Item): void {
    item.selected = !item.selected;
    this.updateSelection(item);
  }

  selectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.items.forEach((item) => {
      item.selected = isChecked;
      this.updateSelection(item);
    });
  }

  updateSelection(item: Item): void {
    if (item.selected) {
      this.selectedItems.add(item.id);
    } else {
      this.selectedItems.delete(item.id);
    }
  }

  onCreate(): void {
    this.prepareModalForNewItem();
    this.openModal();
  }

  onEdit(): void {
    if (this.selectedItems.size === 1) {
      const selectedItem = this.items.find(item => item.id === Array.from(this.selectedItems)[0]);
      if (selectedItem) {
        this.editItem = { ...selectedItem };
        this.openModal();
      }
    }
  }

  onSaveNewItem(): void {
    if (this.editItem.id === 0) {
      const newItem = { 
        id: 0, 
        no: this.editItem.no || '', 
        name: this.editItem.name || '', 
        description: this.editItem.description || '', 
        price: this.editItem.price || 0
      };
  
      this.createItemService.createItem(newItem).subscribe(
        (createdItem) => {
          this.items.push(createdItem);
          this.closeModal();
        },
        (error) => console.error('Error creating item', error)
      );
    } else {
      this.updateItemService.updateItem(this.editItem.id, this.editItem).subscribe(
        (updatedItem) => {
          const index = this.items.findIndex(item => item.id === updatedItem.id);
          if (index !== -1) {
            this.items[index] = updatedItem; 
          }
          this.closeModal();
        },
        (error) => console.error('Error updating item', error)
      );
    }
  }
  
  onDelete(): void {
    this.selectedItems.forEach((id) => {
      this.deleteItemService.deleteItem(id).subscribe(
        () => (this.items = this.items.filter(item => item.id !== id)),
        (error) => console.error('Error deleting item', error)
      );
    });
    this.selectedItems.clear();
  }

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  prepareModalForNewItem(): void {
    this.editItem = { id: 0, no: '', name: '', description: '', price: 0 };
  }

  hasSelectedItems(): boolean {
    return this.selectedItems.size > 0;
  }
}
