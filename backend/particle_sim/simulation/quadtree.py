# import matplotlib.pyplot as plt
import random



class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Circle:
    def __init__(self, x, y, r):
        self.x = x
        self.y = y
        self.r = r
    
    def contains(self, point):
        distance_squared = (point.position.x - self.x)**2 + (point.position.y - self.y)**2
        return distance_squared <= self.r**2
    
    def intersects(self, rectangle):
        in_circlest_x = max(rectangle.x, min(self.x, rectangle.x + rectangle.width))
        in_circlest_y = max(rectangle.y, min(self.y, rectangle.y + rectangle.height))
        
        distance_squared = (self.x - in_circlest_x)**2 + (self.y - in_circlest_y)**2
        return distance_squared <= self.r**2

class Rectangle:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height


    def contains(self, point):
        if (self.x <= point.position.x <= self.x + self.width) and (self.y <= point.position.y <= self.y + self.height):
            return True
    
    def intersects(self, range):
        x_overlap = (self.x < range.x + range.width) and (self.x + self.width > range.x)
        y_overlap = (self.y < range.y + range.height) and (self.y + self.height > range.y)
        return x_overlap and y_overlap
    
    def center(self, point, width=50, height=50):
        x = point.x
        y = point.y
        return Rectangle(x-width/2, y-height/2, width, height)
     

class QuadTreeNode:
    def __init__(self, bounds, depth=0, max_depth=5):
        self.bounds = bounds  # (x, y, width, height)
        self.objects = []
        self.children = []
        self.depth = depth
        self.nw = None 
        self.ne = None 
        self.sw = None 
        self.se = None 
        self.max_depth = max_depth

    def insert(self, point):
        if len(self.objects) < 10 or self.depth >= self.max_depth:
            self.objects.append(point)
        else:
            if not self.children:
                self.split()

            for child in self.children:
                if self.contains(child.bounds, point):
                    child.insert(point)

    def remove(self, point):
        if point in self.objects:
            self.objects.remove(point)
        elif self.children:
            for child in self.children:
                if self.contains(child.bounds, point):
                    child.remove(point)
                    if child.is_empty() and all(child.is_empty() for child in self.children):
                        self.children = []
                        self.objects.extend(child.objects)

    def is_empty(self):
        return not self.objects and not self.children


    def query(self, range):
        points_in_range = []
        ## Automatically abort if the range does not intersect this quad
        if not range.intersects(self.bounds):
            return points_in_range
        ## Check objects at this quad level
        for point in self.objects:
            if range.contains(point):
                points_in_range.append(point)
        ## Terminate here, if there are no children
        if not self.children:
            return points_in_range
        ## Otherwise, add the points from the children
        for child in self.children:
            child_points = child.query(range)
            points_in_range.extend(child_points)

        return points_in_range

    def split(self):
        subwidth = self.bounds.width / 2
        subheight = self.bounds.height / 2
        x = self.bounds.x
        y = self.bounds.y

        self.sw = QuadTreeNode(Rectangle(x, y, subwidth, subheight), self.depth + 1, self.max_depth) ## sw
        self.se = QuadTreeNode(Rectangle(x + subwidth, y, subwidth, subheight), self.depth + 1, self.max_depth) ## se
        self.nw = QuadTreeNode(Rectangle(x, y + subheight, subwidth, subheight), self.depth + 1, self.max_depth) ## nw
        self.ne = QuadTreeNode(Rectangle(x + subwidth, y + subheight, subwidth, subheight), self.depth + 1, self.max_depth) ## ne
        self.children.extend([self.nw, self.ne, self.sw, self.se])

        for obj in self.objects:
            for child in self.children:
                if self.contains(child.bounds, obj):
                    child.insert(obj)
        
        self.objects = []

    def contains(self, bounds, point):
        x = bounds.x
        y = bounds.y
        width = bounds.width
        height = bounds.height
        return (x <= point.position.x < x + width) and (y <= point.position.y < y + height)

# def visualize_quadtree(node, ax):
#     width = node.bounds.width
#     height = node.bounds.height
#     x = node.bounds.x
#     y = node.bounds.y
#     ax.add_patch(plt.Rectangle((x, y), width, height, fill=False, color='black'))
#     ax.text(x + width / 2, y + height / 2, str(len(node.objects)), ha='center', va='center', color='red')

#     for child in node.children:
#         visualize_quadtree(child, ax)

# def main():
#     plt.figure(figsize=(8, 8))
#     ax = plt.gca()
#     ax.set_xlim(-50, 550)
#     ax.set_ylim(-50, 550)
#     ax2 = plt.subplot()
    
#     boundary = Rectangle(0,0,500,500)
#     root = QuadTreeNode(boundary)
    
#     points = [Point(random.randint(0, 500), random.randint(0, 500)) for _ in range(2000)]

#     for point in points:
#         root.insert(point)

#     point = Point(200,150)
#     rect = Rectangle(0,0,0,0)
#     rect = rect.center(point=point, width=100, height=100)
#     circle = Circle(90,350,90)

#     in_circle = root.query(circle)
#     print(len(in_circle))
#     in_circle_x = [p.x for p in in_circle]
#     in_circle_y = [p.y for p in in_circle]

#     in_rect = root.query(rect)
#     print(len(in_rect))
#     in_rect_x = [p.x for p in in_rect]
#     in_rect_y = [p.y for p in in_rect]


#     visualize_quadtree(root, ax)
#     ax.add_patch(plt.Rectangle((rect.x, rect.y), rect.width, rect.height, fill=False, color='red'))
#     ax.add_patch(plt.Circle((circle.x, circle.y), circle.r , fill=False, color='red'))

#     points_x = [point.x for point in points if point not in in_circle if point not in in_rect]
#     points_y = [point.y for point in points if point not in in_circle if point not in in_rect]
    
#     ## all points
#     ax2.scatter(points_x, points_y, marker='.')
#     ## circle points
#     ax2.scatter(circle.x, circle.y, marker='^', c='red', s=10**2)
#     ax2.scatter(in_circle_x, in_circle_y, marker='.',c='green')
#     ## rect points
#     ax2.scatter(rect.x+rect.width/2, rect.y+rect.height/2, marker='^', c='red', s=10**2)
#     ax2.scatter(in_rect_x, in_rect_y, marker='.',c='green')

#     plt.gca().set_aspect('equal', adjustable='box')

#     plt.show()

# if __name__ == "__main__":
#     main()






